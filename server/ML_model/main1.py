
import face_recognition as fr
import cv2 as cv
import os
from datetime import datetime
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import json
# Tk().withdraw()
# load_image = askopenfilename()
target_image = fr.load_image_file("1.jpeg")
target_encoding = fr.face_encodings(target_image)


def encode_faces(folder):
    list_people_encoding = []
    for filename in os.listdir(folder):
        known_image = fr.load_image_file(f'{folder}{filename}')
        known_encoding = fr.face_encodings(known_image)[0]
        list_people_encoding.append((known_encoding, filename))
    return list_people_encoding


def find_target_face():
    people_found = []
    face_location = fr.face_locations(target_image)
    for person in encode_faces("Training_images/"):
        encoded_face = person[0]
        filename = person[1]
        is_target_face = fr.compare_faces(
            encoded_face, target_encoding, tolerance=0.55)
        if face_location:
            face_number = 0
            for location in face_location:
                if is_target_face[face_number]:
                    file_name = os.path.basename(filename)
                    label = os.path.splitext(file_name)[0]
                    people_found.append(label)
                face_number += 1
        else:
            print("No faces found")
    # people_found_dict = dict.fromkeys(people_found, "1")

    return list(set(people_found))

# def markAttendance(name):
#     with open('Attendance.csv', 'r+') as f:
#         myDataList = f.readlines()
#         nameList = []
#         for line in myDataList:
#             entry = line.split(',')
#             nameList.append(entry[0])
#             if name not in nameList:
#                 now = datetime.now()
#                 dtString = now.strftime('%H:%M:%S')
#                 f.writelines(f'\n{name},{dtString}')


print(find_target_face())
# df=pd.DataFrame(find_target_face)
# df.to_csv("D:/Shristi/PES/SEM5/SE/Face-Recognition-Attendance-Projects-main/server/Attendance.csv")
# people_present=find_target_face()
# for name in people_present:
#     markAttendance(name)
