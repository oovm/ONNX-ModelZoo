SetDirectory@NotebookDirectory[];
url = "https://raw.githubusercontent.com/dmlc/gluon-cv/master/scripts/classification/imagenet/imagenet_labels.txt";
raw = Flatten@Import[url, "Table"];
format = StringRiffle[Capitalize /@ StringSplit[#, "_"]]&;
Export["ILSVRC12.json", format /@ raw]