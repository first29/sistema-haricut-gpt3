import cv2

# Cargar la imagen de la persona
person_img = cv2.imread('path/to/person/image.jpg')

# Cargar la imagen del peinado
hairstyle_img = cv2.imread('path/to/hairstyle/image.jpg')

# Cargar el clasificador frontal de Haar para la detección de caras
face_cascade = cv2.CascadeClassifier('path/to/haarcascade_frontalface_default.xml')

# Convertir las imágenes a escala de grises para la detección de rostros
person_gray = cv2.cvtColor(person_img, cv2.COLOR_BGR2GRAY)
hairstyle_gray = cv2.cvtColor(hairstyle_img, cv2.COLOR_BGR2GRAY)

# Detectar la cara en la imagen de la persona
faces = face_cascade.detectMultiScale(person_gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

# Aplicar el peinado en cada cara detectada
for (x, y, w, h) in faces:
    # Cambiar el tamaño del peinado para que se ajuste al rostro
    resized_hairstyle = cv2.resize(hairstyle_gray, (w, h))
    
    # Tomar la región de interés (ROI) del rostro
    face_roi = person_img[y:y+h, x:x+w]
    
    # Combinar el peinado y la cara
    for i in range(3):
        face_roi[:, :, i] = cv2.addWeighted(face_roi[:, :, i], 0.5, resized_hairstyle, 0.5, 0)
        
# Mostrar la imagen combinada
cv2.imshow('Hairstyle Preview', person_img)
cv2.waitKey(0)
cv2.destroyAllWindows()
