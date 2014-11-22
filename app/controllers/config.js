/*!
* Module dependencies.
*/

exports = module.exports = {

  save : function(req, res) {

    var updated = req.body;
    if(updated) {
      common.config.save(updated, function(err) {
        res.redirect('/');
      });
    } else {
      // TODO: flash error
      res.redirect('/');
    }
  }

}
