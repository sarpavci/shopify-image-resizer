import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { randomUUID } from 'crypto';
import { Express, Request, Response } from 'express';

import { MockStore } from '../lib/utils/mock-store';
import { createShopifyAdminClient } from '../lib/utils/shopify';

import uploadFile from '../lib/middlewares/upload-file';
import requireAuth from '../lib/middlewares/require-auth';

interface RequestBody {
  id: string;
  platform: string;
  dimension: string;
  width: number;
  height: number;
}

const getMediaQuery = `
  query GetMedia($mediaId: ID!) {
    node(id: $mediaId) {
      ... on Media {
        id
        mediaContentType
        preview {
          image {
            url
          }
        }
      }
    }
  }    
`;

export default (app: Express) => {
  app.post(
    '/image/resize',
    requireAuth,
    uploadFile,
    async (req: Request, res: Response) => {
      const storeDomain = req?.user?.storeDomain;
      const accessToken = req?.user?.accessToken;

      if (!storeDomain || !accessToken) {
        return res.status(401).json({
          error: 'Unauthorized',
          detail: 'Missing shop credentials in session',
        });
      }

      const shopifyAdminClient = createShopifyAdminClient(
        storeDomain,
        accessToken
      );

      const { id: imageId, platform, dimension, width, height } =
        req.body as RequestBody;

      const media = await shopifyAdminClient.request(getMediaQuery, {
        variables: { mediaId: imageId },
      });

      const mediaContentType = media.data.node.mediaContentType;
      const mediaImageUrl = media.data.node.preview.image.url;

      if (mediaContentType !== 'IMAGE') {
        return res.status(400).json({
          error: 'Media should be image!',
        });
      }

      try {
        let imageBuffer = req.file?.buffer;
        if (!imageBuffer) {
          const response = await fetch(mediaImageUrl);
          if (!response.ok) {
            return res.status(400).json({
              error: 'Failed to fetch image from URL',
            });
          }

          imageBuffer = Buffer.from(await response.arrayBuffer());
        }

        if (!imageBuffer) {
          return res.status(400).json({ error: 'No image uploaded' });
        }

        const resizedImage = await sharp(imageBuffer)
          .resize(+width, +height, { fit: 'cover', position: 'centre' })
          .toBuffer();

        const uploadsDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadsDir))
          fs.mkdirSync(uploadsDir, { recursive: true });

        const fileName = `${Date.now()}-resized-${width}x${height}.png`;
        fs.writeFileSync(path.join(uploadsDir, fileName), resizedImage);

        const filePath = `/uploads/${fileName}`;
        const fileUrl = `${process.env.CLIENT_REDIRECT_URL}${filePath}`;

        const record = {
          id: randomUUID(),
          imageId,
          platform,
          dimension,
          path: filePath,
          url: fileUrl,
          width: +width,
          height: +height,
          timestamp: Date.now(),
        };

        MockStore.add(record);

        return res.json(record);
      } catch (error) {
        return res.status(500).json({
          error: 'Image processing failed',
          detail: error instanceof Error ? error?.message : null,
        });
      }
    }
  );
};
