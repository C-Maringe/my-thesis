from main import app

application = app.wsgi_app

if __name__ == "__main__":
    from werkzeug.serving import run_simple

    run_simple("0.0.0.0", 5000, application)