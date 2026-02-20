import smtplib
from email.mime.text import MIMEText
from flask import current_app

def send_email(user_name, to_email, token_link):
    body = f"Hi {user_name}! \n Clink the below link to verify your account: \n\n{token_link}"
    msg = MIMEText(body)
    msg["Subject"] = "Email confirmation for Price optimiation Tool"
    msg["From"] = current_app.config["MAIL_USERNAME"]
    msg["To"] = to_email

    server = smtplib.SMTP(
        current_app.config["MAIL_SERVER"],
        current_app.config["MAIL_PORT"]
    )

    server.starttls()
    server.login(
        current_app.config["MAIL_USERNAME"],
        current_app.config["MAIL_PASSWORD"]
    )

    server.send_message(msg)
    server.quit()