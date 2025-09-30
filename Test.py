from flask import Flask, render_template, jsonify, request
import pandas as pd
import numpy as np
import pdfplumber

app = Flask(__name__)
app.secret_key = "fhewhfiowe hsdvnio"
import os

print("hel")
This_folder = os.listdir("./Files/")
print(This_folder)
# filename = os.path.join(THIS_FOLDER, path_to_pdf)
def fix_text(item):
    if item is None:
        return None
    parts = item.split("\n")
    # If multi-line like 'lanretxE\nyroehT'
    if len(parts) == 2:
        return parts[1][::-1] + " " + parts[0][::-1]
    # Single word
    return item[::-1]

for file in This_folder:
    path_to_pdf = "./Files/" + file
    pdf = pdfplumber.open(path_to_pdf)
    page = pdf.pages[0]
    print(len(page.chars))
    for char in page.chars:
        if char["upright"]==False:
            print(char)
    print(page.chars[100])
    tb = page.extract_table()
    print(len(tb))
    print(tb[3][-2])
    # for row in tb:
    #     print(row,"\n")
    #     print(len(row))
    #     if row == tb[6]:
    #         fixed_data = [fix_text(x) for x in row]
    #         print(fixed_data)
    #         tb[6] = fixed_data;
    #         print(row)
    #         break
    break
# print(tb)
    # if page == pdf.pages[0]:
    #     df = pd.DataFrame(tb)
    # else:
    #     df = pd.DataFrame(tb[8:])
    # all_tables.append(df)
# combined_df = pd.concat(all_tables, ignore_index=True)
# combined_df.to_csv("output1.csv", index=False)
# print(tables)
# rows = []
# print("TABLE")
# for table in tables:
#     print(table)
#     for row in table:
#         rows.append(row)
#         # print(row)
#     break;
#     print("\\n")


# @app.route("/")
# def home():
#     return render_template("index.html")


# @app.route("/data_recieve", methods=["GET", "POST"])
# def data_recieve():
#     data = combined_df.to_json(orient='index')
#     return data

# if __name__=="__main__":
#     app.run(debug=True)
