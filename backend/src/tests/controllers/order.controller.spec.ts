import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  const orderServiceMock = {
    createOrders: jest.fn(),
  };

  const order: CreateOrderDto[] = [
    {
      film: 'Terminator',
      session: 'day',
      daytime: 'day',
      row: 1,
      seat: 2,
      price: 200,
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .compile();

    orderController = app.get<OrderController>(OrderController);
    orderService = app.get<OrderService>(OrderService);
  });

  it('.createOrder(order) should call OrderService.createOrders()', () => {
    orderController.createOrder(order);

    expect(orderService.createOrders).toHaveBeenCalled();
  });
});
