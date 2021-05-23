import re
with open('whatever.html') as file:
    print("{")
    for i in file.read().split("><"):
        x = re.search('"([^"]*)">([a-zA-Z ,-]*)', i)
        if x:
            y = '{"name": "%s","ons_code": "%s", "region": ""},' % (
                x.group(2), x.group(1))
            print(y)
    print("}")
