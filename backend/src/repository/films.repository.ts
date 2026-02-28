import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async findAll() {
    const films = await this.filmRepository.find({
      relations: ['schedule'],
    });
    return films;
  }

  async findById(id: string) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return film;
  }

  async updateFilm(film: Film) {
    return this.filmRepository.save(film);
  }
}
