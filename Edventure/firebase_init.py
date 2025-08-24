import firebase_admin
from firebase_admin import credentials, firestore, storage
import os

# Path to your serviceAccountKey.json
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cred = credentials.Certificate(os.path.join(BASE_DIR, "serviceAccountKey.json"))

# Initialize Firebase app
firebase_admin.initialize_app(cred, {
    'storageBucket': 'Edventure-dbe80.appspot.com'  # replace with your actual bucket name
})

# Firestore DB
db = firestore.client()

# Storage Bucket
bucket = storage.bucket()
