

export default function Patients(){
   const users = [
    { id: 1, PatientName: "Dimpho",   PatientSurname: "Sener", Age:25 , Gender:"Female" ,
       Contact:"0986543344", Condition:"Diabetic", Status:"Done" , AdmitionDate:"02.12.2026"   },
    { id: 2,   PatientName: "neo", PatientSurname: "Deer", Age:23 , Gender:"male" ,
       Contact:"0986543344", Condition:"Diabetic", Status:"In queue" , AdmitionDate:"02.12.2026"  },
    { id: 3, PatientName: "Lebo", PatientSurname: "Designer", Age:23 , Gender:"Female" ,
       Contact:"0986543344", Condition:"Diabetic", Status:"Done" , AdmitionDate:"02.12.2026" }
  ];
 
    
      

 return(
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient Name
                </th>
                 <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient Surname
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Admission Date
                </th>
              </tr>
            </thead>
            <tbody>
             {users.map((user)=>(
              <tr key={user.id}>
                <td>{user.PatientName}</td>
                <td>{user.PatientSurname}</td>
                <td>{user.Age}</td>
                <td>{user.Gender}</td>
                <td>{user.Contact}</td>
                <td>{user.Condition}</td>
                <td>{user.Status}</td>
                <td>{user.AdmitionDate}</td>
              </tr>
              ))
              
             }

            </tbody>
            
          </table>

      
    
    
  )
}
