import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard'; // JWT 인증 추가

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // ✅ JWT 인증 추가
  async createReview(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    const googleId = req.user.googleId;
    return this.reviewService.createReview(createReviewDto, googleId);
  }

  @Get()
  async getAllreviews() {
    return this.reviewService.getAllReviews();
  }

  @Get(':id')
  async getReviewById(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // ✅ JWT 인증 추가
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req,
  ) {
    const googleId = req.user.googleId;
    console.log('구글아디', googleId);
    return this.reviewService.updateReview(id, updateReviewDto, googleId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // ✅ JWT 인증 추가
  async deleteReview(@Param('id') id: string, @Req() req) {
    const googleId = req.user.googleId;
    return this.reviewService.deleteReview(id, googleId);
  }
}
