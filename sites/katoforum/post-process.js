const path = require('path');
const fs = require('fs');
const linkedom = require('linkedom');
const mdProcess = require('./markdown-process.js');

const posts_json_path = path.join(__dirname, 'post-registry.json');
const post_entry_path = path.join(__dirname, 'postentry');
const html_folder_path = path.join(post_entry_path, 'posthtml');
const md_folder_path = path.join(post_entry_path, 'postmd');
const template_folder_path = path.join(post_entry_path, 'template');

function write_html_file(post, html, callback) {
	var err = false;
    const posttitle = post.title;
	const filepath = path.join(html_folder_path, posttitle) + ".html";
	fs.readFile(path.join(template_folder_path, 'template.html'), (error, data) => {
		if (error) {
            console.log("ERROR: " + error); 
            err = true;
		} else {
            const {document, window} = linkedom.parseHTML(String(data));
			document.getElementById('post-section').innerHTML = html;
			fs.writeFile(filepath, document.documentElement.innerHTML, (error) => {
				if (error) console.log("ERROR: " + error); err = true;
			})
		}
	});
	if (!err) callback();
}

function write_md_file(post, text, callback) {
    const posttitle = post.title;
	const filepath = String(path.join(md_folder_path, posttitle) + ".md");
    fs.writeFile(filepath, text, (error) => {
        if (error) console.log("ERROR: " + error);
        else callback();
    });
}

function remove_file_from_folder(posttitle, folder, callback) {
	var folderpath;
	switch (folder) {
		case 'html': folderpath = html_folder_path; break;
		case 'md': folderpath = md_folder_path; break;
		default: console.log("WARNING: folder path not found");
	}
	fs.rm(path.join(folderpath, posttitle), {recursive:false}, (error) => {
		if (error) console.log("ERROR: " + error);
        else callback();
	});
}

function change_file_name(oldtitle, newtitle, folder, callback) {
	var folderpath;
    var extension;
	switch (folder) {
		case 'html': folderpath = html_folder_path; extension='.html'; break;
		case 'md': folderpath = md_folder_path; extension='.md'; break;
		default: console.log("WARNING: folder path not found");
	}
	fs.rename(path.join(folderpath, oldtitle+extension), path.join(folderpath, newtitle+extension), (error) => {
		if (error) console.log("ERROR: " + error);
        else callback();
	});
}

function find_post_in_list(posttitle, postlist) {
	var target_index = -1;
    for (let i=0; i<postlist.length; i++) {
        if (posttitle == postlist[i].title) {
            target_index = i;
            break;
        }
    }
	return target_index;
}

function create_post_entry(post) {
    const entry = {
        'title': post.title,
        'description': post.description,
        'thumbnail': post.thumbnail,
        'author': 'anonymous'
    } 
    return entry;
}

function add_post_to_json(post, exist_callback, callback) {
	fs.readFile(posts_json_path, 'utf-8', function(error, data) {
		if (error) console.log("ERROR: " + error);
		var postlist = JSON.parse(data);
		var stat = find_post_in_list(post.title, postlist);
        var entry = create_post_entry(post);
		if (stat!=-1) {
            console.log("WARNING: file aready existed");
            exist_callback();
        } else {
			postlist.push(entry);
			fs.writeFile(posts_json_path, JSON.stringify(postlist), (error) => {
				if (error) console.log("ERROR: " + error);
				else callback();
			})
		}
	})
}

function edit_post_from_json(post, no_exist_callback, callback) {
	fs.readFile(posts_json_path, 'utf-8', function(error, data) {
		if (error) console.log("ERROR: " + error);
		var postlist = JSON.parse(data);
		var stat = find_post_in_list(post.oldtitle, postlist);
        var entry = create_post_entry(post);
		if (stat!=-1) {
            postlist[stat] = entry;
            fs.writeFile(posts_json_path, JSON.stringify(postlist), (error) => {
                if (error) console.log("ERROR: " + error);
                else callback();
            })
        } else {
            console.log("WARNING: file doesnt existed");
            no_exist_callback();
		}
	})
}

function remove_post_from_json(filename, error_callback, callback) {
	fs.readFile(posts_json_path, 'utf-8', function(error, data) {
		if (error) console.log("ERROR: " + error);
		var postlist = JSON.parse(data);
		var stat = find_post_in_list(filename, postlist);
		if (stat==-1) {
            console.log("WARNING: file doesn't exist");
            error_callback();
        } else {
			postlist.splice(stat, 1);
			fs.writeFile(posts_json_path, JSON.stringify(postlist), (error) => {
				if (error) console.log("ERROR: " + error);
                else callback();
			})
		}
	})
}

module.exports = {
	add_post_to_json: add_post_to_json,
	remove_post_from_json: remove_post_from_json,
	remove_file_from_folder: remove_file_from_folder,
	write_md_file: write_md_file,
	write_html_file: write_html_file,
    edit_post_from_json: edit_post_from_json,
    change_file_name: change_file_name
}

