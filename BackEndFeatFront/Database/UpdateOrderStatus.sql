USE [admin_dashboard]
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderStatus]    Script Date: 12/7/2024 7:35:37 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[UpdateOrderStatus]
    @OrderId INT,
    @StatusId INT
AS
BEGIN

    UPDATE Orders
    SET StatusId = @StatusId,
        UpdateDate = GETDATE()
    WHERE OrderId = @OrderId;
END
