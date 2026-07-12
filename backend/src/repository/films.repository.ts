import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { IFilm } from './film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private readonly filmModel: Model<IFilm>) {}

  async findAll(): Promise<IFilm[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<IFilm | null> {
    const filmByUuid = await this.filmModel.findOne({ id }).exec();
    if (filmByUuid) {
      return filmByUuid;
    }

    if (isValidObjectId(id)) {
      return this.filmModel.findById(id).exec();
    }

    return null;
  }

  async save(film: any): Promise<void> {
    await film.save();
  }
}
