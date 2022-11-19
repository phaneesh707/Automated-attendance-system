create database face2;
use face2;

create table student(
	SRN varchar(13),
    name varchar(30),
    email varchar(40),
    password varchar(40),
    DOB date,
    face_pic varbinary(8000)
);

create table teacher(
	teacher_id varchar(12),
    name varchar(30),
    email varchar(40),
    password varchar(40),
    dept varchar(20)
);


create table admin(
	admin_id varchar(12),
    name varchar(30),
    email varchar(40),
    password varchar(40),
    dept varchar(20)
);


create table section(
	section_id varchar(10),
    section_name varchar(30),
    dept varchar(30),
    batch_year int
);


create table teaches(
	section_id varchar(10),
    teacher_id varchar(12)
);

create table Attendance(
	curr_date date,
    is_present bool,
    attend_id int auto_increment,
    SRN varchar(13),
    teacher_id varchar(12),
	foreign key (SRN) references student(SRN),
    foreign key (teacher_id) references teacher(teacher_id),
    primary key(attend_id,SRN,teacher_id)
);

-- -----------------------------------------------------------------------------------------------
-- adding primary key constraints
alter table student add constraint primary key(SRN);
alter table teacher add constraint primary key(teacher_id);
alter table admin add constraint primary key(admin_id);
alter table section add constraint primary key(section_id);
alter table teaches add course_id varchar(20);

-- adding foreign keys constraints 
alter table student add admin_id varchar(12);
alter table teacher add admin_id varchar(12);
alter table student add constraint foreign key(admin_id) references admin(admin_id);
alter table teacher add constraint foreign key(admin_id) references admin(admin_id);
alter table student add section_id varchar(12);
alter table student add constraint foreign key(section_id) references section(section_id);


alter table teaches add constraint foreign key(section_id) references section(section_id);
alter table teaches add constraint foreign key(teacher_id) references teacher(teacher_id);
alter table teaches add constraint primary key (teacher_id,section_id);


-- altering the size of srn 
alter table student modify SRN varchar(13);

-- -----------------------------------------------------------------------------------------
-- populating database

-- Admin table 
insert into admin values('Admin001','suresh','suresh707@gmail.com','suresh','CSE');
select * from admin;


-- student table
insert into student values('PES1UG20CS584','phaneesh','phaneesh707@gmail.com','chintu','2002-11-06','http','Admin001','CSE3J');
insert into student values('PES1UG20CS582','jimmy','jimm707@gmail.com','chintu','2002-12-06','http','Admin001','CSE3J');
insert into student values('PES1UG20CS581','don','don@gmail.com','chintu','2002-12-05','http','Admin001','CSE3J');
insert into student values('PES1UG20CS534','tyson','tyson@gmail.com','chintu','2002-01-06','http','Admin001','CSE3I');
insert into student values('PES1UG20CS544','mike','mike707@gmail.com','chintu','2002-02-06','http','Admin001','CSE3I');
insert into student values('PES1UG20CS554','major','hello707@gmail.com','chintu','2002-05-06','http','Admin001','CSE3I');
select * from student;


-- teacher table
insert into teacher values('PES001','MM','MM@gmail.com','PES001','CSE','Admin001');
insert into teacher values('PES002','Jonny','jonny707@gmail.com','PES002','CSE','Admin001');
select * from teacher;


-- section table
insert into section values('CSE3J','J section','CSE',3);
insert into section values('CSE3I','I section','CSE',3);
select * from section;

-- teaches tables
insert into teaches values('CSE3J','PES001','UE20CS301');
insert into teaches values('CSE3I','PES002','UE20CS302');
insert into teaches values('CSE3J','PES002','UE20CS302');
insert into teaches values('CSE3I','PES001','UE20CS301');
-- insert into teaches value('CSE3I','PES004','UE20CS301');
select * from teaches;


	

-- attendance table 

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS584','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS584','PES002');

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS582','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS582','PES002');

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS581','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS581','PES002');

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS534','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS534','PES002');

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS544','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS544','PES002');

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS554','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-17',1,'PES1UG20CS554','PES002');

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-18',1,'PES1UG20CS554','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-18',0,'PES1UG20CS554','PES002');

insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-18',0,'PES1UG20CS544','PES001');
insert into attendance (curr_date,is_present,SRN,teacher_id) values('2022-11-18',1,'PES1UG20CS544','PES002');
select * from attendance;




 