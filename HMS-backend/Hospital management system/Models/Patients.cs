namespace Hospital_management_system.Models
{
    public class Patients
    {
        public int Id { get; set; }
        public required string PatientName { get; set; }
        public required string PatientSurname { get; set; }
        public required int PatientId { get; set; }
        public required string Diagnoses { get; set; }
        public string Medication { get; set; }
    }
}
