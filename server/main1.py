import face_recognition as fr
import cv2 as cv
import os
from datetime import datetime


image = cv.imread("Test_images/test_pic.jpg")
target_image = fr.load_image_file(image)
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
                    label = filename
                    people_found.append(label)
                face_number += 1
        else:
            print("No faces found")
    return people_found


def markAttendance(name):
    with open('Attendance.csv', 'r+') as f:
        myDataList = f.readlines()
        nameList = []
        for line in myDataList:
            entry = line.split(',')
            nameList.append(entry[0])
            if name not in nameList:
                now = datetime.now()
                dtString = now.strftime('%H:%M:%S')
                f.writelines(f'\n{name},{dtString}')


print(find_target_face())
# people_present=find_target_face()
# for name in people_present:
#     markAttendance(name)
