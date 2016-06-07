#-*- coding: utf-8 -*-
import MySQLdb
import sys, json
from dateutil.parser import parse
from apns import APNs, Frame, Payload
import time

reload(sys)
sys.setdefaultencoding('utf-8')

'''
1. existence check (select)
2. if not exist, insert data and push notification
3. if exist, update message (updated date, message)
'''

apns = APNs(use_sandbox=True, cert_file='cert.pem', key_file='key.pem')
token_hex = 'device token'
db = MySQLdb.connect(host, db_id, db_pw, db_name)
cursor = db.cursor()

def time_formater(time):
    return parse(time).strftime("%Y-%m-%d %H:%M:%S")

def is_exist(mid, gid):
    cursor.execute("""
        SELECT id FROM message
        WHERE id=%s AND group_id=%s
    """, (mid, gid))

    if cursor.fetchone():
        return True
    else:
        return False

def update_msg(message, updated_time, message_id):
    cursor.execute ("""
        UPDATE message
        SET message=%s, updated_time=%s
        WHERE id=%s
    """, (message, updated_time, message_id))

'''
cursor.execute("""
    INSERT IGNORE INTO hashtag
    (hashtag) VALUES (%s)
""" % "123")

cursor.execute("""
    INSERT IGNORE INTO message_hashtag
    (message_id, hashtag) VALUES (%s, %s)
""", ("123", "123"))
'''
def insert_msg(message_id, group_id, message, created_time, updated_time, tags):
    cursor.execute("""
        INSERT INTO message
        (id, group_id, message, created_time, updated_time)
        VALUES (%s, %s, %s, %s, %s)
    """, (message_id, group_id, message, created_time, updated_time))

def commit():
    db.commit()

for line in sys.stdin:
    j = json.loads(line)

    message_id = j['id']
    group_id = j['group_id']
    message = j['message'].encode('utf-8')
    created_time = time_formater(j['created_time'])
    updated_time = time_formater(j['updated_time'])

    hashtags = ""
    for tag in j['hashtags']:
        hashtags += tag['hashtag'].encode('utf-8') + ", "

    # if exist update message (updated time and contents of msg)
    if is_exist(message_id, group_id):
        update_msg(message, updated_time, message_id)
        commit();

    else:
        # TODO: insert new message to DB, send push notification to user
        payload = Payload(alert="New message - {}".format(message), sound="default", badge=msgcnt)
        apns.gateway_server.send_notification(token_hex, payload)


db.close()
