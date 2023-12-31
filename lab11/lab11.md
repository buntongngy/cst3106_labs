# Hostpital Triage Database Design Document

## Entitie Description
### Patients 
This entity store all information about the patients, such as their name, gender, injury etc.

### Priority
This entity store the information about the priority for the patients.

### Room
This entity store the room information for the patients.

## Attribute Specification
### Patients Attribute
- `patient_id` (int): A unique identifier for the patients.
- `name` (varChar): The name of the patients.
- `age` (int): The age of the patients.
- `gender` (varChar): The gender of the patients.
- `Injury` (varChar): The patients injury.
- `Level of Pain` (int): The level of pain on a scale of 1 to 10 for the patients injury.
- `priority` (int): A reference to the unique identifier from the priority entity, that indicate the priority of the patients needed.
- `rooms` (int): A reference to the unique identifier from the room entity, that indicate the patients room.
### Priorities Attribute
- `priority` (int): An unique identifire for the priority level.
- `Description` (varChar): A description that explain the reason for the priority.

### Room attribute
- `rooms` (int): An unique identifier that identifier the room number for the patients.
- `doctor_assigned` (varChar): Identify the doctor that been assigned to the room.
- `status` (boolean): The status of the room. (True) if the room is occupied, (False) if not.

## Database ERD
![Database Schema](erd.png)

The erd illustrates the relationship between the three table which is one to many for (priority and patients) and (rooms and patients).