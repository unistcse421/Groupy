#-*- coding: utf-8 -*-
import MySQLdb
import sys, json
from dateutil.parser import parse
from apns import APNs, Frame, Payload
import time
from config import *

reload(sys)
sys.setdefaultencoding('utf-8')

apns = APNs(use_sandbox=True, cert_file='/home/ubuntu/Groupy/push/keys/cert.pem', key_file='/home/ubuntu/Groupy/push/keys/key.pem')
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

for line in sys.stdin:
    j = json.loads(line)

    message_id = j['id']
    group_id = j['group_id']
    message = j['message']
    created_time = time_formater(j['created_time'])
    updated_time = time_formater(j['updated_time'])

    # New message
    if not is_exist(message_id, group_id):
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
