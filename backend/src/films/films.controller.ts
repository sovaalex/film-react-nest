import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    const films = await this.filmsService.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  @Get(':id/schedule')
  async getFilm(@Param('id') id: string) {
    return this.filmsService.findById(id);
  }
}
