import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  findAll() {
    return this.filmsRepository.findAll();
  }

  findById(id: string) {
    return this.filmsRepository.findById(id);
  }
}
