(* ::Package:: *)

(* ::Subsection:: *)
(*setting*)


SetDirectory@NotebookDirectory[];


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
	doDownload["PGGAN trained on CelebA.WXF", "b5201284cf7750c0d15fd6ca27451fd4"]
}


(* ::Subsection:: *)
(*export*)


(* ::Subsubsection:: *)
(*LeNet trained on MNIST*)


net = Import["PGGAN trained on CelebA.WXF"]
json = Export["PGGAN trained on CelebA.json", net, "MXNet"]
