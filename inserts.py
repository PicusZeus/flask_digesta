from app import create_app
app = create_app()
app.app_context().push()
from models import DigestaSectionModel

def select_all():
    all_ = DigestaSectionModel.query.all()
    print(all_)



if __name__ == "__main__":
    select_all()