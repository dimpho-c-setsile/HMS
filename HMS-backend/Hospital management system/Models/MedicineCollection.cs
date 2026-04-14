namespace Hospital_management_system.Models
{
    public class MedicineCollection
    {
        public int CollectionId { get; set; }
        public required string PatientName { get; set; }
        public required string MedicineName { get; set; }
        public required string status { get; set; }


    }
}
