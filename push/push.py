#-*- coding: utf-8 -*-
import MySQLdb
import sys, json
from dateutil.parser import parse
from apns import APNs, Frame, Payload
import time

reload(sys)
sys.setdefaultencoding('utf-8')

# DB configurations
host = ""
db_id = ""
db_pw = ""
db_name = ""

apns = APNs(use_sandbox=True, cert_file='cert.pem', key_file='key.pem')
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

def insert_msg(message_id, group_id, message, created_time, updated_time, tags):
    cursor.execute("""
        INSERT INTO message
        (id, group_id, message, created_time, updated_time)
        VALUES (%s, %s, %s, %s, %s)
    """, (message_id, group_id, message, created_time, updated_time))

    tag_list = list()
    for t in tags:
        tag_list.append(t['hashtag'].encode('utf8mb4'))

    if tag_list:
        q_base = "INSERT IGNORE INTO message_hashtag (message_id, hashtag) VALUES "
        temp_list = list()
        for t in tag_list:
            temp_list.append("(\'{}\')".format(t))

        q_base += ", ".join(temp_list)
        cursor.execute(q_base)

        temp_list = list()
        for t in tag_list:
            temp_list.append((message_id, t))

        cursor.executemany("""
            INSERT IGNORE INTO message_hashtag
            (message_id, hashtag) VALUES (%s, %s)
        """, temp_list)

def commit():
    db.commit()

for line in sys.stdin:
    j = json.loads(line)

    message_id = j['id']
    group_id = j['group_id']
    message = j['message']
    created_time = time_formater(j['created_time'])
    updated_time = time_formater(j['updated_time'])

'''
    # Message is already exist
    if is_exist(message_id, group_id):
        update_msg(message, updated_time, message_id)
        commit();
'''

    # New message
    if not is_exist(message_id, group_id):
        #insert_msg(message_id, group_id, message, created_time, updated_time, j['hashtags'])
        #commit();

        cursor.execute("""
            SELECT uuid, push_keyword FROM push_info
            WHERE group_id=%s AND uuid in
            (SELECT uuid FROM device WHERE push_enabled=1)
        """ % group_id)

        result = cursor.fetchall()
        for entry in result:
            uuid = entry[0]
            keyword = entry[1]
            if keyword in message:
                payload = Payload(alert="키워드 '{}' 의 새로운 글이 등록되었습니다.".format(keyword), sound="default", badge=1)
                apns.gateway_server.send_notification(uuid, payload)


db.close()
