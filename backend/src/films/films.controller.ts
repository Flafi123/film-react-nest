import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms(): Promise<FilmResponseDto[]> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<ScheduleResponseDto> {
    return this.filmsService.findSchedule(id);
  }
}
