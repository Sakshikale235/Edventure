from firebase_init import db

def add_user():
    doc_ref = db.collection('users').add({
        'name': 'John Doe',
        'email': 'john@example.com'
    })
    print("User added:", doc_ref)

if __name__ == "__main__":
    add_user()
