USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[GetOrders]    Script Date: 12/7/2024 7:34:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[GetOrders]
    @PageNumber INT,
    @PageSize INT,
    @StartDate DATETIME2 = NULL,
    @EndDate DATETIME2 = NULL,
    @StatusName NVARCHAR(50) = NULL,
    @CustomerName NVARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

 
    DECLARE @TotalCount INT;

    SELECT 
        @TotalCount = COUNT(*)
    FROM Orders o
    JOIN Customers c ON o.CustomerId = c.CustomerId
    JOIN OrderStatuses os ON o.StatusId = os.StatusId
    WHERE 
        (@StartDate IS NULL OR o.OrderDate >= @StartDate) AND
        (@EndDate IS NULL OR o.OrderDate <= @EndDate) AND
        (@StatusName IS NULL OR os.StatusName = @StatusName) AND
        (@CustomerName IS NULL OR c.FullName LIKE '%' + @CustomerName + '%');


    SELECT @TotalCount AS TotalCount;

   
    WITH OrderedOrders AS
    (
        SELECT 
            o.OrderId,
            c.FullName AS CustomerName,
            os.StatusName AS OrderStatus,
            os.StatusId AS StatusId,
            o.OrderDate,
            ROW_NUMBER() OVER (ORDER BY o.OrderId) AS RowNum
        FROM Orders o
        JOIN Customers c ON o.CustomerId = c.CustomerId
        JOIN OrderStatuses os ON o.StatusId = os.StatusId
        WHERE 
            (@StartDate IS NULL OR o.OrderDate >= @StartDate) AND
            (@EndDate IS NULL OR o.OrderDate <= @EndDate) AND
            (@StatusName IS NULL OR os.StatusName = @StatusName) AND
            (@CustomerName IS NULL OR c.FullName LIKE '%' + @CustomerName + '%')
    )
    SELECT 
        OrderId,
        CustomerName,
        OrderStatus,
        StatusId,
        OrderDate
    FROM OrderedOrders
    WHERE RowNum BETWEEN (@PageNumber - 1) * @PageSize + 1 AND @PageNumber * @PageSize;
END
