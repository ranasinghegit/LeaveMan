namespace LeaveManAPI.DTOs
{
    public class LeaveRequest
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string Reason { get; set; }
    }
}