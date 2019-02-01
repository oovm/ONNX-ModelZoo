(* ::Package:: *)

(* ::Subsection::Closed:: *)
(*assist*)


downloadCheck[dict_, hash_String] := GeneralUtilities`Scope[
	md5 = Hash[ReadByteArray[dict["File"]], "MD5", "HexString"];
	If[md5 != hash, Print[dict["File"] <> " Failed!"]]
];
doDownload[name_, hash_] := GeneralUtilities`Scope[
	If[FileExistsQ@name, Echo[name, "Exist: "];Return[Nothing]];
	task = URLDownloadSubmit[
		url <> StringReplace[name, {" " -> "%20"}], name,
		HandlerFunctions -> <|"TaskFinished" :> (downloadCheck[#, hash]&)|>,
		HandlerFunctionsKeys -> {"File"}
	];
	task["TaskUUID"]
];


(* ::Subsection:: *)
(*await*)


TaskWait /@ {
	doDownload["LeNet trained on MNIST.WXF", "a1a9ff73e9f1e5dd16ed73b1ac8a3dfe"]
}


(* ::Subsection:: *)
(*export*)


(* ::Subsubsection:: *)
(*LeNet trained on MNIST*)


net = Import["LeNet trained on MNIST.WXF"]
json = Export["LeNet trained on MNIST.json", net, "MXNet"]
