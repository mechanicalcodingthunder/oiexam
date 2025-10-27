from pathlib import Path
import json


folders = Path("./Files")
for folder in folders.iterdir():
    Input_files = []
    if folder:
        Files_path = folder.rglob("*pdf")
        Outpath = Path("./Resultss") / folder.parts[1]
        Outpath.mkdir(parents=True, exist_ok=True)
        print(list(Outpath.rglob("*csv")))
        for Input_file_path in Files_path:
            Input_files.append(str(Input_file_path))
        json_path = Outpath / "index.json"
        if list(Outpath.rglob("*csv")):
            file_num = len(list(Outpath.rglob("*csv")))
            print(file_num)
        else:
            print("Path already exist")
        # print(json_path)
        # with open(json_path, "w") as f:
        #     json.dump({"Files": Input_files}, f, indent=2)
    # print(Input_files)
# Outpath = Path("./Results") / file_path.parts[1]
# Outpath.mkdir(parents=True, exist_ok=True)
