import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('cdn')
export class CdnController {
  private readonly IMGBB_API_KEY = '23426686fef26255161e09873534cdf6';

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: memoryStorage(),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    
    try {
      const base64Image = file.buffer.toString('base64');
      const formData = new URLSearchParams();
      formData.append('image', base64Image);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return {
          statusCode: 201,
          message: 'Image uploaded successfully',
          data: {
            url: data.data.url,
            filename: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
          }
        };
      } else {
        throw new BadRequestException(data.error?.message || 'Failed to upload image to ImgBB');
      }
    } catch (error: any) {
      throw new BadRequestException('Image upload failed: ' + error.message);
    }
  }
}
