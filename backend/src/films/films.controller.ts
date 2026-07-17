import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    const films = await this.filmsService.findAll();
    return {
      items: films,
      total: films.length,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const scheduleResult = await this.filmsService.findSchedule(id);
    const sessions = scheduleResult?.sessions || [];
    
    return {
      items: sessions,
      total: sessions.length,
    };
  }
}