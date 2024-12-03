namespace Dashboard.DTOs
{
    public class OrderDetailDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public int Quantity { get; set; }
        public decimal OrderDetailTotalPrice { get; set; }
    }

}
