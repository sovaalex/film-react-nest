import { FilmsController } from 'src/films/films.controller';
import { FilmsService } from 'src/films/films.service';
import { TestingModule, Test } from '@nestjs/testing';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;
  const filmsMockService = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(filmsMockService)
      .compile();

    filmsController = app.get<FilmsController>(FilmsController);
    filmsService = app.get<FilmsService>(FilmsService);
  });

  it('.getFilms should call FilmsService.findAll', () => {
    filmsController.getFilms();

    expect(filmsService.findAll).toHaveBeenCalled();
  });

  it('.getFilmById should call FilmsService.findById', () => {
    filmsController.getFilmById('1');

    expect(filmsService.findById).toHaveBeenCalled();
  });
});
