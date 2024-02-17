const path = require('path');
const fs = require('fs');
const files_json_path = path.join(__dirname, 'file-registry.json');
const tmp_folder_path = path.join(__dirname, 'tmp');
const backup_folder_path = path.join(__dirname, 'backup');
const storage_folder_path = path.join(__dirname, 'storage');

function generate_files_json(route) {
	const files = fs.readdirSync(route, 'utf8');
	const response = [];
	for (let file of files) {
		const extension = path.extname(file);
		const filesize = fs.statSync(route + file).size;
		response.push({ filename: file, extension: extension, filesize: filesize });
	}
	const data = JSON.stringify(response);
	fs.writeFileSync('file-registry.json', data);
}

function move_file_to_folder(file, folder, callback) {
	var folderpath;
	switch (folder) {
		case 'tmp': folderpath = tmp_folder_path; break;
		case 'storage': folderpath = storage_folder_path; break;
		case 'backup': folderpath = backup_folder_path; break;
		default: console.log("WARNING: folder path not found");
	}
	file.mv(path.join(folderpath, file.name), (error) => {
		if (error) console.log("ERROR: " + error);
        else callback();
	})
}

function remove_file_from_folder(filename, folder, callback) {
	var folderpath;
	switch (folder) {
		case 'tmp': folderpath = tmp_folder_path; break;
		case 'storage': folderpath = storage_folder_path; break;
		case 'backup': folderpath = backup_folder_path; break;
		default: console.log("WARNING: folder path not found");
	}
	fs.rm(path.join(folderpath, filename), {recursive:false}, (error) => {
		if (error) console.log("ERROR: " + error);
        else callback();
	});
}

function get_file_info(file) {
	const filename = file.name;
	const filepath = path.join(tmp_folder_path, filename);
	const extension = path.extname(filepath);
	const filesize = fs.statSync(filepath).size;
	const mimetype = file.mimetype.split('/')[0];
	const daycreated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	return {
        filename: filename, 
        extension: extension, 
        filesize: filesize, 
        mimetype: mimetype, 
        date: daycreated
    };
}

function find_file_in_list(filename, filelist) {
	var target_index = -1;
    for (let i=0; i<filelist.length; i++) {
        if (filename == filelist[i].filename) {
            target_index = i;
            break;
        }
    }
	return target_index;
}

function add_file_to_json(file, exist_callback, callback) {
	fs.readFile(files_json_path, 'utf-8', function(error, data) {
		if (error) console.log("ERROR: " + error);
		var filelist = JSON.parse(data);
		var filedata = get_file_info(file);
		var stat = find_file_in_list(filedata.filename, filelist);
		if (stat!=-1) {
            console.log("WARNING: file aready existed");
            exist_callback();
        } else {
			filelist.push(filedata);
			fs.writeFile(files_json_path, JSON.stringify(filelist), (error) => {
				if (error) console.log("ERROR: " + error);
				else callback();
			})
		}
	})
}

function remove_file_from_json(filename, error_callback, callback) {
	fs.readFile(files_json_path, 'utf-8', function(error, data) {
		if (error) console.log("ERROR: " + error);
		var filelist = JSON.parse(data);
		var stat = find_file_in_list(filename, filelist);
		if (stat==-1) {
            console.log("WARNING: file doesn't exist");
            error_callback();
        } else {
			filelist.splice(stat, 1);
			fs.writeFile(files_json_path, JSON.stringify(filelist), (error) => {
				if (error) console.log("ERROR: " + error);
                else callback();
			})
		}
	})
}

function clear_file_tmp(filename) {
	fs.rmSync(path.join(tmp_folder_path, filename));
}


module.exports = {
	generate_files_json: generate_files_json,
	get_file_info: get_file_info,
	add_file_to_json: add_file_to_json,
	remove_file_from_json: remove_file_from_json,
	clear_file_tmp: clear_file_tmp,
	move_file_to_folder: move_file_to_folder,
	remove_file_from_folder: remove_file_from_folder
}

