import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from 'src/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

  async findAll() {
    const films = await this.filmModel.find();
    return films;
  }

  async findById(id: string) {
    const film = await this.filmModel.findOne({ id });
    return film;
  }

  async updateFilm(film: Film) {
    return this.filmModel.updateOne({ id: film.id }, film);
  }
}
