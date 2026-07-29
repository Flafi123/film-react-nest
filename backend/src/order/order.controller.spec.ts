import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderFixture } from './order.fixtures';
describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue({
              orderId: 'mock-database-id-999',
              status: 'created',
            }),
          },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('должен быть определен', () => {
    expect(orderController).toBeDefined();
  });

  describe('createOrder', () => {
    it('должен вызвать метод orderService.createOrder с правильными данными', async () => {
      await orderController.createOrder(orderFixture);
      expect(orderService.createOrder).toHaveBeenCalledWith(orderFixture);
    });

    it('должен вернуть orderId и статус от сервиса', async () => {
      const result = await orderController.createOrder(orderFixture);

      expect(result).toEqual({
        orderId: 'mock-database-id-999',
        status: 'created',
      });
    });
  });
});
