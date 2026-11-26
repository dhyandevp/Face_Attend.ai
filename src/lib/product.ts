import { z } from 'zod';
export const repoUrl = 'https://github.com/dhyandevp/FaceAttend.ai';
export const contactSchema = z.object({
 name: z.string().trim().min(1, 'Enter your full name.').max(100),
 email: z.string().trim().email('Enter a valid email address.').max(255),
 message: z.string().trim().min(1, 'Enter your message.').max(2000),
 website: z.string().max(0, 'Submission rejected.').default(''),
});
export const benchmarks: { accuracy: number | null; speed: number | null } = { accuracy: null, speed: null };
export const editions = [
 { name: 'Open Source', price: 0, period: 'forever', description: 'For the curious. For the builders.', features: ['Core face recognition', 'Local CSV export', 'GitHub community support'], unavailable: ['Cloud sync', 'Multi-camera integration'] },
 { name: 'Pro License', price: 4999, period: 'year', description: 'For your next active deployment.', features: ['Everything in Open Source', 'SMS & email alerts · planned', 'Cloud database sync · planned', 'Analytics dashboard · planned', 'Priority email support · planned'], unavailable: [] },
 { name: 'Campus / Enterprise', price: null, period: '', description: 'For institutions thinking bigger.', features: ['Everything in Pro · planned', 'Dedicated on-premise server · planned', 'Multi-camera integration · planned', 'White labeling · planned', '24/7 phone support · planned'], unavailable: [] },
];
export const plannedFeatures = ['Liveness detection', 'Excel export', 'SMS alerts', 'Cloud sync', 'Advanced analytics', 'Multi-camera integration'];
export const installCode = `git clone https://github.com/dhyandevp/FaceAttend.ai.git\ncd FaceAttend.ai\npip install opencv-contrib-python numpy pandas pillow\npython main.py`;
export const recognitionCode = `def recognize_face(frame):\n    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)\n    faces = face_cascade.detectMultiScale(gray)\n    for (x, y, w, h) in faces:\n        id, distance = recognizer.predict(\n            gray[y:y+h, x:x+w]\n        )\n        if distance < configured_threshold:\n            mark_attendance(id)`;
