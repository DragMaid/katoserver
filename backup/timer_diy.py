import time

h = int(input("Enter hours: "))
m = int(input("Enter minutes: "))
s = int(input("Enter seconds: "))

print(f"thời gian bạn chọn là: {h:02d}:{m:02d}:{s:02d}")

def convert_time_to_second(h,m,s):
    x = h * 3600 + m * 60 + s
    return x

second = convert_time_to_second(h,m,s)
print("Start countdown")
time.sleep(1.5)

for x in range(second, 0, -1):
    x -= 1
    minutes, x = divmod(x, 60)
    hours, minutes = divmod(minutes, 60)
    print(f"{hours:02d} : {minutes:02d} : {x:02d}")
    time.sleep(1)