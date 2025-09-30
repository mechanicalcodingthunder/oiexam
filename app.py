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
file = This_folder[5]
path_to_pdf = "./Files/" + file
pdf = pdfplumber.open(path_to_pdf)
all_tables = []
print(path_to_pdf)
for page in pdf.pages:
    tb = page.extract_table({"text_line_dir":"btt"})
    print(tb[6])
    if page == pdf.pages[0]:
        df = pd.DataFrame(tb)
    else:
        df = pd.DataFrame(tb[8:])
    all_tables.append(df)
combined_df = pd.concat(all_tables, ignore_index=True)
combined_df.to_excel('filename.xlsx', sheet_name='MySheet')
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
