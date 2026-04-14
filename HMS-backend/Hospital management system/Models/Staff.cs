namespace Hospital_management_system.Models
{
    public class Staff
    {
        public int StaffId { get; set; }
        public required string EmployeeName { get; set; }
        public required string EmployeeSurname { get; set; }
        public string Department { get; set; } 
        public string Role { get; set; }
    }
}
