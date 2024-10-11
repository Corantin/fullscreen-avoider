"use strict";

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;

function init() {
	ExtensionUtils.initTranslations();
}

function buildPrefsWidget() {
    let settings = ExtensionUtils.getSettings();
	let box = new Gtk.Box({
		halign: Gtk.Align.CENTER,
		orientation: Gtk.Orientation.VERTICAL,
		'margin-top': 20,
		'margin-bottom': 20,
		'margin-start': 20,
		'margin-end': 20,
		spacing: 16
	});

	box.append(buildSwitcher(settings, 'move-hot-corners', _('Move Hot Corners:')));
	box.append(buildSwitcher(settings, 'move-notifications', _('Move Notifications:')));
  box.append(buildIntInput(settings, "secondary-monitor", _("Secondary Monitor:")));

	return box;
}

function buildSwitcher(settings, key, labeltext) {
	let hbox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 10 });

	let label = new Gtk.Label({label: labeltext });

	let switcher = new Gtk.Switch();

  settings.bind(key, switcher, "active", Gio.SettingsBindFlags.DEFAULT);

	hbox.append(label);
	hbox.append(switcher);

	return hbox;
}

function buildIntInput(settings, key, labeltext) {
  let hbox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 10 });
  let label = new Gtk.Label({ label: labeltext });
  
  const input = new Gtk.SpinButton({
    adjustment: new Gtk.Adjustment({
      lower: -1, // Adjust these as needed
      upper: 10, // Set upper limit based on the number of monitors
      step_increment: 1,
    }),
    value: settings.get_int(key),
    valign: Gtk.Align.CENTER,
  });

  settings.bind(key, input, "value", Gio.SettingsBindFlags.DEFAULT);

  hbox.append(label);
	hbox.append(input);

  return hbox;
}