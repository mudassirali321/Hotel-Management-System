using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OPS.HotelService.OrderService.dto;
using OPS.OPS_Models;

namespace OPS.HotelService.OrderService
{
    public class OrderService : OPSAppServiceBase
    {
        private readonly IRepository<OrderDetail> _orderDetailRepository;
        private readonly IRepository<Order> _orderRepository;
        private readonly IRepository<Tables> _tableRepository;

        public OrderService(IRepository<OrderDetail> orderDetail, IRepository<Order> order, IRepository<Tables> tableRepository)
        {
            this._orderDetailRepository = orderDetail;
            this._orderRepository = order;
            this._tableRepository = tableRepository;
        }

        [HttpPost]
        public async Task<bool> PostOrderPlace(OrderDto order)
        {
            if (order != null)
            {
                var olist = new Order();
                olist.CustomerName = order.CustomerName;
                olist.CustomerAddress = order.CustomerAddress;
                olist.CustomerEmail = order.CustomerEmail;
                olist.SubTotal = order.SubTotal;
                olist.Discount = order.Discount;
                olist.Tax = order.Tax;
                olist.TableId = order.TableId;
                olist.TotalPrice = order.TotalPrice;
                olist.isActive = order.isActive;
                olist.OrderStatus = "O";
                var ordertrue = await _orderRepository.InsertAsync(olist);
                CurrentUnitOfWork.SaveChanges();
                if (ordertrue != null)
                {
                    var orderDetail = order.OrderDetail;
                    foreach (var ODetail in orderDetail)
                    {
                        var odlist = new OrderDetail();
                        odlist.OrderId = olist.Id;
                        odlist.Title = ODetail.Title;
                        odlist.Description = ODetail.Description;
                        odlist.ItemQuatity = ODetail.ItemQuatity;
                        odlist.SalePrice = ODetail.SalePrice;
                        odlist.Discount = ODetail.Discount;
                        odlist.Tax = ODetail.Tax;
                        odlist.PriceAfterDiscount = ODetail.PriceAfterDiscount;
                        odlist.TotalPrice = ODetail.TotalPrice;
                        var orDetail = await _orderDetailRepository.InsertAsync(odlist);
                        await CurrentUnitOfWork.SaveChangesAsync();


                    }

                }
                else
                {
                    return false;
                }

            }
            else
            {
                return false;
            }

            return true;

        }

        [HttpPost]
        public async Task<bool> updateOrderStatus(int orderid, string orderStatus)
        {

            var order1 = _orderRepository.Get(orderid);

            order1.OrderStatus = orderStatus;
            await _orderRepository.UpdateAsync(order1);
            await CurrentUnitOfWork.SaveChangesAsync();
            return true;
        }

        #region Get All Orders
        public async Task<List<OrderDto>> getAllOrders(string fromDate, string toDate)
        {
            if (fromDate == null || fromDate.ToUpper() == "NULL")
            {
                fromDate = null;
            }
            if (toDate == null || toDate.ToUpper() == "NULL")
            {
                toDate = null;
            }

            DateTime fromDate1;
            DateTime.TryParse(fromDate, out fromDate1);
            DateTime toDate1;
            DateTime.TryParse(toDate, out toDate1);

            var query = await _orderRepository.GetAll()
                .Include(y => y.TableFk)
                 .Where(obj =>
                   (fromDate != null && toDate == null &&
                   obj.CreationTime.Date == fromDate1.Date)
                    ||
                (fromDate == null && toDate != null &&
                    obj.CreationTime.Date == toDate1.Date)
                    ||
                 (fromDate != null && toDate != null &&
                    obj.CreationTime.Date >= fromDate1.Date && obj.CreationTime.Date <= toDate1.Date)
                    ||
                 (fromDate == null && toDate == null &&
                  1 == 1)
                )
                .Select(z => new OrderDto
                {
                    Id = z.Id,
                    TableId = z.TableId,
                    TableName = z.TableFk.Title,
                    isActive = z.isActive,
                    OrderStatus = z.OrderStatus,
                    CustomerName = z.CustomerName,
                    TotalPrice = z.TotalPrice,
                    CreationTime = z.CreationTime
                }).ToListAsync();

            return query;
        }
        #endregion

        public async Task<List<OrderDto>> getAllActiveOrders()
        {
            var query = await _orderRepository.GetAll()
                .Where(obj => obj.OrderStatus != "S" && obj.OrderStatus != "C")
                .Include(y => y.TableFk)

                                             .Select(z => new OrderDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 OrderStatus = z.OrderStatus,
                                                 CustomerName = z.CustomerName,
                                                 TotalPrice = z.TotalPrice,
                                                 CreationTime = z.CreationTime
                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }

        #region Get All Taday Without Process Orders
        public async Task<List<OrderDto>> getAllTodayWithoutProcessOrders()
        {

            var query = await _orderRepository.GetAll()
                .Where(obj => obj.OrderStatus == "C" && obj.CreationTime.Date == DateTime.Now.Date)
                .Include(y => y.TableFk)

                                             .Select(z => new OrderDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 OrderStatus = z.OrderStatus,
                                                 CustomerName = z.CustomerName,
                                                 TotalPrice = z.TotalPrice,
                                                 CreationTime = z.CreationTime
                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }

        #endregion

        #region Get All Taday Successfully Closed Orders
        public async Task<List<OrderDto>> getAllTodaySuccessfullyClosedOrders()
        {
            var query = await _orderRepository.GetAll()
                .Where(obj => obj.OrderStatus == "S" && obj.CreationTime.Date == DateTime.Now.Date)
                .Include(y => y.TableFk)

                                             .Select(z => new OrderDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 OrderStatus = z.OrderStatus,
                                                 CustomerName = z.CustomerName,
                                                 TotalPrice = z.TotalPrice,
                                                 CreationTime = z.CreationTime
                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }

        #endregion

        public async Task<int> getTadayRevenue()
        {
            var query = _orderRepository.GetAll()
                .Where(obj => obj.OrderStatus == "S" && obj.CreationTime.Date == DateTime.Now.Date).ToList();
            int Total = 0;

            if (query != null)
            {
                for (int i = 0; i < query.Count; i++)
                {
                    Total += Convert.ToInt16(query[i].TotalPrice);
                }
            }
            return Total;
        }

        public async Task<List<OrderDto>> getAllTodayOpenAndClosedOrder()
        {
            var query = await _orderRepository.GetAll()
                .Where(obj => obj.CreationTime.Date == DateTime.Now.Date)
                .Include(y => y.TableFk)

                                             .Select(z => new OrderDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 OrderStatus = z.OrderStatus,
                                                 CustomerName = z.CustomerName,
                                                 TotalPrice = z.TotalPrice,
                                                 CreationTime = z.CreationTime
                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }
        public async Task<List<OrderDto>> getAllKitchenOrders()
        {
            var query = await _orderRepository.GetAll()
                .Where(obj => obj.OrderStatus == "O" || obj.OrderStatus == "I" || obj.OrderStatus == "D")
                .Include(y => y.TableFk)
                                              .Where(x => x.isActive == true)
                                             .Select(z => new OrderDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 OrderStatus = z.OrderStatus,
                                                 CustomerName = z.CustomerName,
                                                 CreationTime = z.CreationTime
                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<OrderDto>> getTadayActiveOrders()
        {
            var query = await _orderRepository.GetAll()
                .Where(obj => (obj.OrderStatus == "O" || obj.OrderStatus == "I" || obj.OrderStatus == "D") && obj.CreationTime.Date == DateTime.Now.Date)
                .Include(y => y.TableFk)
                                              .Where(x => x.isActive == true)
                                             .Select(z => new OrderDto
                                             {
                                                 Id = z.Id,
                                                 TableId = z.TableId,
                                                 TableName = z.TableFk.Title,
                                                 isActive = z.isActive,
                                                 OrderStatus = z.OrderStatus,
                                                 CustomerName = z.CustomerName,
                                                 CreationTime = z.CreationTime
                                             }).ToListAsync();
            if (query != null)
            {
                return query;
            }
            else
            {
                return null;
            }
        }
        public async Task<List<OrderDetail>> getOrderDetailOnOrderId(int orderId)
        {
            var oDetail = await _orderDetailRepository.GetAll().Where(x => x.OrderId == orderId).ToListAsync();
            if (oDetail != null)
            {
                return oDetail;
            }
            else
            {

            }
            return null;

        }


    }
}
