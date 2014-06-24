Bookmarks
=========

View page of Netscape Bookmarks files. Basically an HTML page being able to load,
offline, a Netscape Bookmarks file, view it in a (tree-like) indented style,
and making it searchable.

The Firefox browser offers simple searchability for bookmarks in a side bar and
has funtionality in order to organize bookmarks, but i wasn't able to search for
bookmark folders which would really be helpful with deeply folded collections of
bookmarks. Luckily they allow you to export your bookmarks into the old Netscape
bookmarks format. This is obviously still in common use and other browsers (Google
Chrome and IE) too have that kind of export option.

A Netscape bookmarks file is nothing but HTML - a nested definition list that can
be displayed in any browser. Only this doesn't help you find a bookmark. So i did
a little bit to enhance this view, emphasize the tree structure of the data, make
folders visible and foldable. With a little help from HTML 5 File API and jQuery
i added options to conveniently load those files offline and search for links and
folders of links. As an option you can use regular expressions.

So that 's what it is...
