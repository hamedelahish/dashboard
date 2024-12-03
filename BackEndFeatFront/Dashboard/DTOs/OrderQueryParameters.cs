namespace Dashboard.DTOs
{
    public class OrderQueryParameters
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public DateTime? StartDate { get; set; } = null;
        public DateTime? EndDate { get; set; } = null;
        public string StatusName { get; set; } = null;
        public string CustomerName { get; set; } = null;
    }

}
