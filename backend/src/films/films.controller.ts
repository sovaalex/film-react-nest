import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

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

    @Get(':id/shedule')
  async getFilmById(@Param('id') id: string) {
    const film = await this.filmsService.findById(id);
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    return film.schedule;
  }
}
