USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetOrderDetails]    Script Date: 12/7/2024 7:34:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetOrderDetails]
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        o.OrderId,
        o.OrderDate,
        o.TotalPrice AS OrderTotalPrice,
		O.StatusId AS OrderStatusId,
        c.CustomerId,
        c.FullName AS CustomerName,
        c.Email AS CustomerEmail,
        c.Phone AS CustomerPhone,
        c.Address AS CustomerAddress,
        p.Id AS ProductId,
        p.name AS ProductName,
        p.Price AS ProductPrice,
        od.Quantity,
        od.TotalPrice AS OrderDetailTotalPrice
    FROM Orders o
    JOIN Customers c ON o.CustomerId = c.CustomerId
    JOIN OrderDetails od ON o.OrderId = od.OrderId
    JOIN Products p ON od.ProductId = p.id
    WHERE o.OrderId = @OrderId;
END
