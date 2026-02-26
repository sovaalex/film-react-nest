import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  async findById(id: string) {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }

    return film.schedule;
  }
}
